import { BrowserRouter, Route, Switch, Redirect, Link  } from 'react-router-dom';
import { useState } from 'react';

import { AgentChoiceScreen } from './screen/Choice/Agent';
import { MapChoiceScreen } from './screen/Choice/Map'
import { PostScreen } from './screen/posts/Post';
import { RegisterScreen } from './screen/register/register';
import { LoginScreen } from './screen/login/Login';
import { CreatePostScreen } from './screen/admin/createPost/Create.Post';
import { EditPostScreen } from './screen/admin/editPost/Edit.Post';
import { MyProfileScreen } from './screen/admin/myProfile/My.Profile';
import { ViewPostsScreen } from './screen/admin/viewPosts/View.Posts';

import { isAutenticate } from "./services/auth";
import { NotFound } from './screen/NotFound/NotFound';


const PrivateRoute = ({ children, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={
        ({ location }) => (
          isAutenticate() ? (
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
          <MapChoiceScreen />
        </Route>

        <Route path="/Maps">
          <MapChoiceScreen />
        </Route>

        <Route path="/Agents">
          <AgentChoiceScreen />
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
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App
