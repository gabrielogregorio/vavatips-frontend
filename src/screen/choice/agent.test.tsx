import 'dotenv/config'
import { screen, render, waitForElementToBeRemoved } from '@testing-library/react'
import { AgentScreen } from './Agent'
import { BrowserRouter } from "react-router-dom";
import { rest } from 'msw'
import { mockAgents } from './mock';
import { setupServer } from 'msw/node'

const baseURL = process.env.REACT_APP_API_HOST

const handlers = [
  rest.get(`${baseURL}/agents/undefined`, async(req, res, ctx) => {
    return res(ctx.json(mockAgents()))
  })
]

const server = setupServer(...handlers)

describe('<AgentScreen />', () => {

  beforeAll(() => {
    return server.listen()
  })

  afterEach(() => {
    return server.resetHandlers()
  })

  afterAll(() => {
    return server.close()
  })

  it('should render agent screen', async () => {
    render(<BrowserRouter><AgentScreen /></BrowserRouter>)

    await waitForElementToBeRemoved(screen.getByText(/Buscando Agentes/i), {timeout: 2000})

    expect(screen.getByText(/Sova/i)).toBeInTheDocument()
    expect(screen.getByText(/Astra/i)).toBeInTheDocument()
    expect(screen.getByText(/Raze/i)).toBeInTheDocument()
    expect(screen.getByText(/Yoru/i)).toBeInTheDocument()

    expect(screen.getByRole('img', {name: 'Sova'})).toBeInTheDocument()
    expect(screen.getByRole('img', {name: 'Astra'})).toBeInTheDocument()
    expect(screen.getByRole('img', {name: 'Raze'})).toBeInTheDocument()
    expect(screen.getByRole('img', {name: 'Yoru'})).toBeInTheDocument()
  })
})
