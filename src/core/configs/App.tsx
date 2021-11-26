import { useState } from 'react'
import { BrowserRouter, Route, Switch, Redirect  } from 'react-router-dom'
import { AccessScreen } from '../../pages/access/access'
import { ConfigScreen } from '../../pages/admin/config/config'
import { CreatePostScreen } from '../../pages/admin/createPost/Create.Post'
import { DashboardScreen } from '../../pages/admin/dashboard/dashboard'
import { EditPostScreen } from '../../pages/admin/editPost/Edit.Post'
import { MyProfileScreen } from '../../pages/admin/myProfile/My.Profile'
import { SuggestionScreen } from '../../pages/admin/suggestions/Suggestion'
import { ViewPostsScreen } from '../../pages/admin/viewPosts/View.Posts'
import { AgentScreen } from '../../pages/choice/Agent'
import { MapScreen } from '../../pages/choice/Map'
import { HomeScreen } from '../../pages/home'
import { NotFoundScreen } from '../../pages/notFound/NotFound'
import { SaveScreen } from '../../pages/save'
import { TestScreen } from '../../pages/tested'
import { ContextFilters } from '../contexts/filters'
import { ContextModalMessage, modalMessageType } from '../contexts/modalMessage'
import { ContextModalSuggestion, modalContextType } from '../contexts/modalSuggestion'
import { isAuthenticated } from '../services/auth'


const PrivateRoute = ({ children, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={
        () => (
          isAuthenticated() ? (
            children
          ) : (
            <Redirect to='/Login' />
          ))
      }
    />
  )
}



function Routes() {
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

export default Routes
