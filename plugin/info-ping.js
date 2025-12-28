import { cpus as _cpus, totalmem, freemem } from 'os'
import { performance } from 'perf_hooks'
import { sizeFormatter } from 'human-readable'

let format = sizeFormatter({
  std: 'JEDEC',
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
})

let handler = async (m, { conn }) => {
  let nomeDelBot = global.db.data.nomedelbot || '𝑽𝑬𝑲𝑨𝑫𝑰𝑹-𝑩𝑶𝑻'
  let versioneBot = `${vs}`

  let old = performance.now()
  let neww = performance.now()
  let speed = (neww - old).toFixed(2)
  let uptime = process.uptime() * 1000

  const cpus = _cpus().map(cpu => {
    cpu.total = Object.values(cpu.times).reduce((a, b) => a + b, 0)
    return cpu
  })

  const cpu = cpus.reduce((last, cpu, _, { length }) => {
    last.total += cpu.total
    last.speed += cpu.speed / length
    last.times.user += cpu.times.user
    last.times.nice += cpu.times.nice
    last.times.sys += cpu.times.sys
    last.times.idle += cpu.times.idle
    last.times.irq += cpu.times.irq
    return last
  }, {
    speed: 0,
    total: 0,
    times: { user: 0, nice: 0, sys: 0, idle: 0, irq: 0 }
  })

  let cpuModel = cpus[0]?.model || 'Unknown Model'
  let cpuSpeed = cpu.speed.toFixed(2)

  let caption = `𝐏𝐈𝐍𝐆 𝐁𝐎𝐓
⌛ *Uptime:* ${clockString(uptime)}
⚡ *Ping:* ${speed} ms`

  let messageOptions = {
    contextInfo: {
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '',
        serverMessageId: '',
        newsletterName: nomeDelBot
      }
    }
  }

  await conn.sendMessage(m.chat, {
    text: caption,
    ...messageOptions
  })
}

handler.help = ['ping']
handler.tags = ['info', 'tools']
handler.command = /^(ping)$/i

export default handler

function clockString(ms) {
  let d = Math.floor(ms / 86400000)
  let h = Math.floor(ms / 3600000) % 24
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return [d, h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
            }
