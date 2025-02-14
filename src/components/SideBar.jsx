import { Outlet } from "react-router-dom";
import styles from "./Sidebar.module.css";
import AppNav from "./AppNav";
import Logo from "./Logo";

export default function SideBar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <footer className={styles.footer}></footer>
      <p className={styles.copyright}>
        &copy; Copyright{new Date().getFullYear()} by Worldwide inc.
      </p>
    </div>
  );
}
