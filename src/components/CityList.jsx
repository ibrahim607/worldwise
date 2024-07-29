/* eslint-disable react/prop-types */
import CityItem from "./CityItem";
import Spinner from "./Spinner";
import styles from "./CityList.module.css";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

// eslint-disable-next-line react/prop-types
function CityList() {
  const { cities, isLoading } = useCities();
  if (isLoading) {
    return <Spinner />;
  }

  if (!cities.length)
    return (
      <Message message="add your first city by clicking on a city on the map" />
    );

  return (
    <ul className={styles.cityList}>
      {/* // eslint-disable-next-line react/prop-types */}
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
