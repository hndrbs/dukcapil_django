import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Dukcapil from './pages/Dukcapil'
import DukcapilDetail from './pages/DukcapilDetail'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchReligions, fetchMaritalStatuses } from './store/actions'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchReligions())
    dispatch(fetchMaritalStatuses())
  }, [])

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/" exact={true}>
            <Redirect to="/dukcapil" />
          </Route>
          <Route path="/dukcapil" exact={true}>
            <Dukcapil  />
          </Route>
          <Route path="/dukcapil/:id" exact={true}>
            <DukcapilDetail  />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
}

export default App;