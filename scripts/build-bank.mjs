import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { COMPANIES } from '../src/data/companies.js'
import { TEMPLATES } from '../src/data/templates.js'
import { buildArchitecture } from '../src/data/architectures.js'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public', 'data')

function combos(pool, correct, take = 3) {
  const rest = pool.filter((x) => x !== correct)
  const out = []
  for (let i = 0; i < rest.length; i++) {
    for (let j = i + 1; j < rest.length; j++) {
      for (let k = j + 1; k < rest.length; k++) {
        out.push([rest[i], rest[j], rest[k]])
      }
    }
  }
  if (!out.length) {
    out.push(rest.slice(0, take))
  }
  return out
}

function hash(s) {
  let h = 0
  for (const c of s) h = (h * 33 + c.charCodeAt(0)) >>> 0
  return h
}

async function main() {
  await mkdir(outDir, { recursive: true })
  let total = 0
  for (const company of COMPANIES) {
    const arch = buildArchitecture(company)
    const questions = []
    let n = 0
    for (const stage of arch.stages) {
      const tpls = TEMPLATES.filter((t) => t.stages.includes(stage.i))
      const use = tpls.length ? tpls : TEMPLATES
      for (const tpl of use) {
        const ds = combos(tpl.pool, tpl.correct)
        for (let d = 0; d < ds.length; d++) {
          for (let v = 0; v < tpl.prompts.length; v++) {
            questions.push({
              id: `${company.id}-${stage.i}-${tpl.id}-${d}-${v}`,
              stage: stage.i,
              tid: tpl.id,
              variant: v,
              correct: tpl.correct,
              distractors: ds[d],
              seed: hash(`${company.id}:${stage.i}:${tpl.id}:${d}:${v}`),
            })
            n++
          }
        }
      }
    }
    total += n
    const payload = {
      company: { id: company.id, name: company.name, accent: company.accent, asset: company.asset, verb: company.verb },
      nodes: arch.nodes,
      edges: arch.edges,
      stages: arch.stages,
      questions,
    }
    await writeFile(join(outDir, `${company.id}.json`), JSON.stringify(payload))
    console.log(company.id, n)
  }
  console.log('total questions', total)
}

main()
