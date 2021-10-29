import { BrowserRouter, Route, Switch, Redirect  } from 'react-router-dom'
import { AgentScreen } from './tmpscreen/choice/Agent'
import { MapScreen } from './tmpscreen/choice/Map'
import { HomeScreen } from './tmpscreen/home'
import { AccessScreen } from './tmpscreen/access/access'
import { CreatePostScreen } from './tmpscreen/admin/createPost/Create.Post'
import { EditPostScreen } from './tmpscreen/admin/editPost/Edit.Post'
import { MyProfileScreen } from './tmpscreen/admin/myProfile/My.Profile'
import { ViewPostsScreen } from './tmpscreen/admin/viewPosts/View.Posts'
import { NotFoundScreen } from './tmpscreen/notFound/NotFound'
import { isAuthenticated } from "./services/auth"
import { ConfigScreen } from './tmpscreen/admin/config/config'
import { SuggestionScreen } from './tmpscreen/admin/suggestions/Suggestion'
import { DashboardScreen } from './tmpscreen/admin/dashboard/dashboard'
import { SaveScreen } from './tmpscreen/save'
import { TestScreen } from './tmpscreen/tested'

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
