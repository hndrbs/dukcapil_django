import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonItem,
  IonToolbar,
  useIonViewWillEnter,
  IonLoading,
} from '@ionic/react';
import { fetchDukcapilDetail } from '../store/actions'
import { useSelector, useDispatch } from 'react-redux'
import Row from '../components/Row' 
import { useParams } from 'react-router';

const DukcapilDetail = () => {
  const { id } = useParams()
  const { dukcapilDetailData, loading, error } = useSelector(state => state.detailReducer)
  const { religions, marital_statuses, error: errorMixState } = useSelector(state => state.religionAndMaritalStatusReducer)
  const dispatch = useDispatch()

  useIonViewWillEnter(() => {
    dispatch(fetchDukcapilDetail(id))
  });

  const convertReligionId = (religionId) => {
    const filteredReligion = religions.filter(({ religion_id }) => religion_id === religionId)
    return filteredReligion[0].religion_name
  }

  const convertMaritalStatusId  = (maritalStatusId) => {
    const filteredMaritalStatus = marital_statuses.filter(({ marital_status_id }) => marital_status_id === maritalStatusId)
    return filteredMaritalStatus[0].marital_status_desc
  }

   if (loading) {
    return (
      <IonPage><IonContent>
        <IonLoading
          isOpen={loading}
          message={'Please wait...'}
          duration={1200}
        />
      </IonContent></IonPage>
    )
  } else if (error || errorMixState) {
    return (
      <IonPage><IonContent>
        <IonItem>
          {
            error
            ? JSON.stringify(error)
            : JSON.stringify(errorMixState)
          }
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
              tdata={convertReligionId(dukcapilDetailData.religion_id)} 
            />
            <Row 
              tlabel="Marital Status" 
              tdata={convertMaritalStatusId(dukcapilDetailData.marital_status)} 
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
