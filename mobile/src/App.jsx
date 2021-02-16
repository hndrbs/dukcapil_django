import { IonApp, IonRouterOutlet, useIonViewWillEnter } from '@ionic/react';
import { fetchReligions, fetchMaritalStatuses } from './store/actions'
import { Dukcapil, DukcapilDetail, SearchResult } from './pages'
import { Redirect, Route } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import { useDispatch } from 'react-redux'

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
import './App.css'

const App = () => {
  const dispatch = useDispatch()
  useIonViewWillEnter(() => {
    dispatch(fetchReligions())
    dispatch(fetchMaritalStatuses())
  })

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/" exact={true}>
            <Redirect to="/dukcapil" />
          </Route>
          <Route path="/dukcapil" exact={true}>
            <Dukcapil />
          </Route>
          <Route path="/search" exact={true}>
            <SearchResult />
          </Route>
          <Route path="/dukcapil/:id" exact={true}>
            <DukcapilDetail />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
}

export default App;
