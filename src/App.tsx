import { BrowserRouter, Route, Switch, Redirect  } from 'react-router-dom'

import { AgentScreen } from './screen/Choice/Agent'
import { MapScreen } from './screen/Choice/Map'
import { PostScreen } from './screen/posts/Post'
import { AcessScreen } from './screen/admin/access/access'
import { CreatePostScreen } from './screen/admin/createPost/Create.Post'
import { EditPostScreen } from './screen/admin/editPost/Edit.Post'
import { MyProfileScreen } from './screen/admin/myProfile/My.Profile'
import { ViewPostsScreen } from './screen/admin/viewPosts/View.Posts'
import { NotFoundScreen } from './screen/NotFound/NotFound'
import { isAuthenticated } from "./services/auth"
import { ConfigScreen } from './screen/admin/config/config'


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
          <PostScreen />
        </Route>

        <Route path="/Login">
          <AcessScreen />
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
