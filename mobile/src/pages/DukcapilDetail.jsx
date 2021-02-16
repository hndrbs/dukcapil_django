import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  useIonViewWillEnter,
  IonLoading,
  IonRefresher,
  IonRefresherContent
} from '@ionic/react';
import { fetchDukcapilDetail } from '../store/actions'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Error } from '../components'
import { useParams } from 'react-router-dom';

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

  const refresh = (e) => {
    dispatch(fetchDukcapilDetail(id))
    setTimeout(() => {
      e.detail.complete();
    }, 2000);
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
      <IonPage>
        <Error
          message={error.message || errorMixState.message}
          refreshFunction={refresh}
        />
      </IonPage>
    ) 
  }

  return (
    <IonPage id="view-message-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons>
            <IonBackButton text="Data Kependudukan" ></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={refresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
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
