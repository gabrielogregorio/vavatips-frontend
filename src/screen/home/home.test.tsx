import 'dotenv/config'
import { screen, render, waitForElementToBeRemoved, waitFor } from '@testing-library/react'
import { HomeScreen } from '.'
import { BrowserRouter } from "react-router-dom";
import { rest } from 'msw'
import { mockPosts } from './mock';
import { setupServer } from 'msw/node'
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const baseURL = process.env.REACT_APP_API_HOST

const handlers = [
  rest.get(`${baseURL}/Posts`, async(req, res, ctx) => {
    const query = req.url.searchParams
    query.append('agent', 'Sova')
    query.append("map", "Ascent")
    query.append("page", '1')
    query.append("filters", '')

    return res(ctx.json(mockPosts()))
  })
]

const server = setupServer(...handlers)

describe('<HomeScreen />', () => {

  beforeAll(() => {
    return server.listen()
  })

  afterEach(() => {
    return server.resetHandlers()
  })

  afterAll(() => {
    return server.close()
  })

  it('should render home screen', async () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: `/Posts`, search: '?map=Ascent&agent=Sova' }]}>
        <HomeScreen />
      </MemoryRouter>
    )

    await waitForElementToBeRemoved(screen.getByText(/Carregando posts/i), {timeout: 2000})


    expect(screen.getByRole('heading', {name: mockPosts().posts[0].title})).toBeInTheDocument()
    expect(screen.getByRole('heading', {name: mockPosts().posts[1].title})).toBeInTheDocument()
    expect(screen.getByRole('heading', {name: mockPosts().posts[2].title})).toBeInTheDocument()
    expect(screen.getByRole('heading', {name: mockPosts().posts[3].title})).toBeInTheDocument()
    expect(screen.getByRole('heading', {name: mockPosts().posts[4].title})).toBeInTheDocument()
    expect(screen.getByRole('heading', {name: mockPosts().posts[5].title})).toBeInTheDocument()
    expect(screen.getByRole('heading', {name: mockPosts().posts[6].title})).toBeInTheDocument()
    expect(screen.getByRole('heading', {name: mockPosts().posts[7].title})).toBeInTheDocument()
    expect(screen.getByRole('heading', {name: mockPosts().posts[8].title})).toBeInTheDocument()
    expect(screen.getByRole('heading', {name: mockPosts().posts[9].title})).toBeInTheDocument()

    expect(screen.getByText(mockPosts().posts[0].description)).toBeInTheDocument()
    expect(screen.getByText(mockPosts().posts[1].description)).toBeInTheDocument()
    expect(screen.getByText(mockPosts().posts[2].description)).toBeInTheDocument()
    expect(screen.getByText(mockPosts().posts[3].description)).toBeInTheDocument()
    expect(screen.getByText(mockPosts().posts[4].description)).toBeInTheDocument()
    expect(screen.getByText(mockPosts().posts[5].description)).toBeInTheDocument()
    expect(screen.getByText(mockPosts().posts[6].description)).toBeInTheDocument()
    expect(screen.getByText(mockPosts().posts[7].description)).toBeInTheDocument()
    expect(screen.getByText(mockPosts().posts[8].description)).toBeInTheDocument()
    expect(screen.getByText(mockPosts().posts[9].description)).toBeInTheDocument()

    expect(screen.getAllByRole('button', {name: 'A testar'})).toHaveLength(mockPosts().posts.length)
    expect(screen.getAllByRole('button', {name: 'Salvo'})).toHaveLength(mockPosts().posts.length)
    expect(screen.getAllByRole('button', {name: 'Sugerir'})).toHaveLength(mockPosts().posts.length)
  })

  it('should change image on click in buttons of navigation', async () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: `/Posts`, search: '?map=Ascent&agent=Sova' }]}>
        <HomeScreen />
      </MemoryRouter>
    )

    await waitForElementToBeRemoved(screen.getByText(/Carregando posts/i), {timeout: 2000})

    // buttons of first post
    let buttonPrev = screen.getAllByLabelText('Item anterior')[0]
    let buttonNext = screen.getAllByLabelText('Proximo item')[0]

    // navigation in items the post
    expect(screen.getByAltText(mockPosts().posts[0].imgs[0].description)).toBeInTheDocument()
    userEvent.click(buttonNext)

    await waitFor(() => {
      expect(screen.getByAltText(mockPosts().posts[0].imgs[1].description)).toBeInTheDocument()
    }, {timeout: 3000})

    userEvent.click(buttonPrev)

    await waitFor(() => {
      expect(screen.getByAltText(mockPosts().posts[0].imgs[0].description)).toBeInTheDocument()
    }, {timeout: 3000})

    userEvent.click(buttonNext)
    userEvent.click(buttonNext)

    await waitFor(() => {
      expect(screen.getByAltText(mockPosts().posts[0].imgs[2].description)).toBeInTheDocument()
    }, {timeout: 3000})

    userEvent.click(buttonNext)

    await waitFor(() => {
      expect(screen.getByAltText(mockPosts().posts[0].imgs[0].description)).toBeInTheDocument()
    }, {timeout: 3000})
  })

  it('should change page of click in pagination system', () => {
    
  })
})
