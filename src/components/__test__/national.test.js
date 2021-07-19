import { render, screen, cleanup } from '@testing-library/react'
import renderer from 'react-test-renderer'
import National from '../National'

test('matches snapshot', () => {
  const tree = renderer.create(<National />).toJSON()
  //   console.log(tree)
  expect(tree).toMatchSnapshot()
})
