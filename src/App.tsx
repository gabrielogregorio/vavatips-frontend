import { BrowserRouter, Route, Switch, Redirect, Link  } from 'react-router-dom';

import { AgentChoiceComponent } from './screen/Choice/Agent';
import { MapChoiceComponent } from './screen/Choice/Map'
import { PostScreen } from './screen/posts/Post';
import { RegisterScreen } from './screen/register/register';
import { LoginScreen } from './screen/login/Login';
import { CreatePostScreen } from './screen/admin/createPost/Create.Post';
import { EditPostScreen } from './screen/admin/editPost/Edit.Post';
import { MyProfileScreen } from './screen/admin/myProfile/My.Profile';
import { ViewPosts } from './screen/admin/viewPosts/View.Posts';
import { HomeScreen } from './screen/home/Home';

import { isAutenticate } from "./services/auth";
import { UserContext, userInterface } from './context/user';
import { useState } from 'react';
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
            <Redirect to={{ pathname: '/Login', state: { from: location } }} />
          ))
      }
    />
  )
}



function App() {
  const [user, setUser] = useState<userInterface>({username: '', id: ''})

  return (
    <BrowserRouter>
      <Switch>

        <Route exact path="/">
          <HomeScreen />
        </Route>


        <Route path="/Maps">
          <MapChoiceComponent />
        </Route>

        <Route path="/Agents">
          <AgentChoiceComponent />
        </Route>

        <Route path="/Posts">
          <PostScreen />
        </Route>


        <UserContext.Provider value={{user, setUser}}>
          <Route path="/Login">
            <LoginScreen />
          </Route>

          <Route path="/Register">
            <RegisterScreen />
          </Route>

          <PrivateRoute path="/ViewPosts">
              <ViewPosts />
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
          </UserContext.Provider>


          <Route path="*">
            <NotFound />
          </Route>

      </Switch>
    </BrowserRouter>
  )
}

export default App
