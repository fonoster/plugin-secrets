import {expect, test} from '@oclif/test'

describe('create', () => {
  // test
  // .stdout()
  // .stdin('echo secret')
  // .command(['create', 'ward', '-s'])
  // .it('runs create from stdin', (ctx, done) => {
  //   expect(ctx.stdout).to.contain('secret')
  //   done()
  // })

  test
  .stdout()
  .command(['create', 'ward', '-l', 'secret-word'])
  .it('runs create from literal', ctx => {
    expect(ctx.stdout).to.contain('secret-word')
  })
})

describe('create 2', () => {
  test
  .stdout()
  .command(['create', 'ward', '-s'])
  .it('runs create from stdin', ctx => {
    expect(ctx.stdout).to.contain('secret')
  })
})
