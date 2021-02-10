// import { useState } from 'react';
// import { Message, getMessage } from '../data/messages';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonItem,
  IonToolbar,
  useIonViewWillEnter,
} from '@ionic/react';
import { fetchDukcapilDetail } from '../store/actions'
import { useSelector, useDispatch } from 'react-redux'
import Row from '../components/Row' 
import { useParams } from 'react-router';
import './ViewMessage.css';

const DukcapilDetail = () => {
  // const [message, setMessage] = useState();
  const { id } = useParams()
  const { dukcapilDetailData, loading, error } = useSelector(state => state.detailReducer)
  const dispatch = useDispatch()

  useIonViewWillEnter(() => {
    dispatch(fetchDukcapilDetail(id))
  });

   if (loading) {
    return (
      <IonPage><IonContent>
        <IonItem>
          loadinnnng
        </IonItem>  
      </IonContent></IonPage>
    )
  } else if (error) {
    return (
      <IonPage><IonContent>
        <IonItem>
          {JSON.stringify(error)}
        </IonItem>  
      </IonContent></IonPage>
    ) 
  }

  return (
    <IonPage id="view-message-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons>
            <IonBackButton text="Data Kependudukan" defaultHref="/dukcapil"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {dukcapilDetailData ? (
          <table
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: '1rem',
              borderSpacing: '4px',
              borderCollapse: 'separate'
              
            }}
          >
            <Row 
              tlabel="Name" 
              tdata={dukcapilDetailData.name} 
            />
            <Row 
              tlabel="Maiden Name" 
              tdata={dukcapilDetailData.maiden_name} 
            />
            <Row 
              tlabel="NIK" 
              tdata={dukcapilDetailData.nik} 
            />
            <Row 
              tlabel="Birth Date" 
              tdata={dukcapilDetailData.birth_date} 
            />
            <Row 
              tlabel="Gender" 
              tdata={dukcapilDetailData.gender} 
            />
            <Row 
              tlabel="Religion" 
              tdata={dukcapilDetailData.religion_id} 
            />
            <Row 
              tlabel="Marital Status" 
              tdata={dukcapilDetailData.marital_status} 
            />
          </table>
          
        ) : (
          <div>Data not found</div>
        )}
      </IonContent>
    </IonPage>
  );
}

export default DukcapilDetail;
