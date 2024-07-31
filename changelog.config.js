const compareFunc = require('compare-func')

const typeMap = {
  feat: '✨',
  fix: '🐛',
  docs: '📝',
  style: '💄',
  ui: '🎨',
  perf: '⚡',
  refactor: '🧩',
  test: '✅',
  revert: '⏪',
  build: '👷',
  ci: '🔩',
  chore: '🧱'
}

module.exports = {
  writerOpts: {
    transform: (commit, context) => {
      let discard = true
      const issues = []

      commit.notes.forEach(note => {
        note.title = 'BREAKING CHANGES'
        discard = false
      })

      if (commit.type && commit.type !== null) {
        commit.type = typeMap[commit.type] + ' ' + commit.type
      } else {
        return
      }

      if (commit.scope === '*') {
        commit.scope = ''
      }

      commit.subject = `${commit.type}: ` + commit.subject

      if (typeof commit.hash === 'string') {
        commit.hash = commit.hash.substring(0, 7)
      }

      if (typeof commit.subject === 'string') {
        let url = context.repository ? `${context.host}/${context.owner}/${context.repository}` : context.repoUrl
        if (url) {
          url = `${url}/issues/`
          // Issue URLs.
          commit.subject = commit.subject.replace(/#([0-9]+)/g, (_, issue) => {
            issues.push(issue)
            return `[#${issue}](${url}${issue})`
          })
        }
        if (context.host) {
          // User URLs.
          commit.subject = commit.subject.replace(/\B@([a-z0-9](?:-?[a-z0-9/]){0,38})/g, (_, username) => {
            if (username.includes('/')) {
              return `@${username}`
            }
            return `[@${username}](${context.host}/${username})`
          })
        }
      }

      // remove references that already appear in the subject
      commit.references = commit.references.filter(reference => {
        if (issues.indexOf(reference.issue) === -1) {
          return true
        }
        return false
      })
      return commit
    },
    groupBy: 'committerDate',
    commitGroupsSort: 'type',
    commitsSort: ['scope', 'subject'],
    noteGroupsSort: 'title',
    notesSort: compareFunc
  }
}
