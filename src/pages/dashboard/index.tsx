import styles from "./index.module.scss";

const Dashboard = () => {
  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <div>
        <audio id="audioPlayer" controls style={{ width: "50%" }}>
          <source src="/api/get-audio" type="audio/wav" />
        </audio>
      </div>
    </div>
  );
};

export default Dashboard;
