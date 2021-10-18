import { render, screen } from "@testing-library/react"
import { H1 } from '.'

describe('<H1 />', () => {
  it('should render h1', () => {
    render(<H1 title="Testando componente" />)
    expect(screen.getByRole('heading', {name: /Testando componente/i})).toBeInTheDocument()
  })

  it('should match snapshot', () => {
    const { container } = render(<H1 title="Testando componente" />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
