import { render, screen } from "@testing-library/react"
import { FooterComponent } from '.'

describe('<ErrorMsg />', () => {
  it('should render footer with primary color', () => {
    render(<FooterComponent color='primary' />)
    expect(screen.getByRole('heading', {name: 'Sobre'})).toBeInTheDocument()
  })
})
