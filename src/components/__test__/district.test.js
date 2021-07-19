import { render, screen, cleanup } from '@testing-library/react'
import renderer from 'react-test-renderer'
import District from '../District'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

test('Renders component that uses use Params', () => {
  const history = createMemoryHistory()
  const route = '/district/:id'
  history.push(route)
  const tree = renderer
    .create(
      <Router history={history}>
        <District />
      </Router>
    )
    .toJSON()
  //   console.log(tree)
  expect(tree).toMatchSnapshot()
})
