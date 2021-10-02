import { BrowserRouter, Route, Switch, Redirect  } from 'react-router-dom';

import { AgentScreen } from './screen/Choice/Agent';
import { MapScreen } from './screen/Choice/Map'
import { PostScreen } from './screen/posts/Post';
import { RegisterScreen } from './screen/register/register';
import { LoginScreen } from './screen/login/Login';
import { CreatePostScreen } from './screen/admin/createPost/Create.Post';
import { EditPostScreen } from './screen/admin/editPost/Edit.Post';
import { MyProfileScreen } from './screen/admin/myProfile/My.Profile';
import { ViewPostsScreen } from './screen/admin/viewPosts/View.Posts';
import { NotFoundScreen } from './screen/NotFound/NotFound';
import { isAuthenticated } from "./services/auth";


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
          <LoginScreen />
        </Route>

        <Route path="/Register">
          <RegisterScreen />
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

        <Route path="*">
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
