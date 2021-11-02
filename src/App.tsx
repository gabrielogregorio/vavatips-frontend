import { BrowserRouter, Route, Switch, Redirect  } from 'react-router-dom'
import { AgentScreen } from './screen/choice/Agent'
import { MapScreen } from './screen/choice/Map'
import { HomeScreen } from './screen/home'
import { AccessScreen } from './screen/access/access'
import { CreatePostScreen } from './screen/admin/createPost/Create.Post'
import { EditPostScreen } from './screen/admin/editPost/Edit.Post'
import { MyProfileScreen } from './screen/admin/myProfile/My.Profile'
import { ViewPostsScreen } from './screen/admin/viewPosts/View.Posts'
import { NotFoundScreen } from './screen/notFound/NotFound'
import { isAuthenticated } from "./services/auth"
import { ConfigScreen } from './screen/admin/config/config'
import { SuggestionScreen } from './screen/admin/suggestions/Suggestion'
import { DashboardScreen } from './screen/admin/dashboard/dashboard'
import { SaveScreen } from './screen/save'
import { TestScreen } from './screen/tested'
import { ContextModalSuggestion, modalContextType } from './contexts/modalSuggestion'
import { ContextModalMessage, modalMessageType } from './contexts/modalMessage'
import { ContextFilters } from './contexts/filters'
import { useState } from 'react'

const PrivateRoute = ({ children, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={
        ({ location }) => (
          isAuthenticated() ? (
            children
          ) : (
            <Redirect to='/Login' />
          ))
      }
    />
  )
}



function App() {
  const [ modalSuggestion, setModalSuggestion ] = useState<modalContextType>({active: false})
  const [ modalMessage, setModalMessage ] = useState<modalMessageType>({message: {msg: '', type: 'success'}, active: false})
  const [ tags, setTags ] = useState<string[]>([])
  const [ filters, setFilters ] = useState<string[]>([])

  return (
    <ContextModalSuggestion.Provider value={{modalSuggestion, setModalSuggestion}}>
      <ContextModalMessage.Provider value={{modalMessage, setModalMessage}}>
        <ContextFilters.Provider value={{tags, filters, setFilters, setTags}}>
          <BrowserRouter>
            <Switch>
              <Route exact path="/">
                <MapScreen />
              </Route>

              <Route path="/Maps">
                <MapScreen />
              </Route>

              <Route path="/Agents">
                <AgentScreen />
              </Route>

              <Route path="/Posts">
                <HomeScreen />
              </Route>

              <Route path="/Save">
                <SaveScreen />
              </Route>

              <Route path="/Tested">
                <TestScreen />
              </Route>

              <Route path="/Login">
                <AccessScreen />
              </Route>

              <PrivateRoute path="/ViewPosts">
                <ViewPostsScreen />
              </PrivateRoute>

              <PrivateRoute path="/PostCreate">
                <CreatePostScreen />
              </PrivateRoute>

              <PrivateRoute path="/PostEdit">
                <EditPostScreen />
              </PrivateRoute>

              <PrivateRoute path="/Profile">
                <MyProfileScreen />
              </PrivateRoute>

              <PrivateRoute path="/Suggestions">
                <SuggestionScreen />
              </PrivateRoute>

              <PrivateRoute path="/Dashboard">
                <DashboardScreen />
              </PrivateRoute>

              <PrivateRoute path="/Config">
                <ConfigScreen />
              </PrivateRoute>

              <Route path="*">
                <NotFoundScreen />
              </Route>
            </Switch>
          </BrowserRouter>
        </ContextFilters.Provider>
      </ContextModalMessage.Provider>
    </ContextModalSuggestion.Provider>
  )
}

export default App
