import { BrowserRouter, Route, Switch, Redirect  } from 'react-router-dom'
import { AgentScreen } from './screen/Choice/Agent'
import { MapScreen } from './screen/Choice/Map'
import { HomeScreen } from './screen/home'
import { AccessScreen } from './screen/access/access'
import { CreatePostScreen } from './screen/admin/createPost/Create.Post'
import { EditPostScreen } from './screen/admin/editPost/Edit.Post'
import { MyProfileScreen } from './screen/admin/myProfile/My.Profile'
import { ViewPostsScreen } from './screen/admin/viewPosts/View.Posts'
import { NotFoundScreen } from './screen/NotFound/NotFound'
import { isAuthenticated } from "./services/auth"
import { ConfigScreen } from './screen/admin/config/config'
import { SuggestionScreen } from './screen/admin/suggestions/Suggestion'
import { DashboardScreen } from './screen/admin/dashboard/dashboard'
import { SaveScreen } from './screen/Save'
import { TestScreen } from './screen/Tested'

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
  return (
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
  )
}

export default App
