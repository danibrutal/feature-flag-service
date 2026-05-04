import styles from "./AppShell.module.css";

type Props = {
  children: React.ReactNode;
};

export function AppShell({ children }: Props) {
  return <main className={styles.shell}>{children}</main>;
}
