import { render, screen, cleanup } from '@testing-library/react'
import renderer from 'react-test-renderer'
import State from '../State'
import { BrowserRouter } from 'react-router-dom'

test('Renders without crashing', () => {
  const tree = renderer
    .create(
      <BrowserRouter>
        <State />
      </BrowserRouter>
    )
    .toJSON()
  //   console.log(tree)
  expect(tree).toMatchSnapshot()
})
