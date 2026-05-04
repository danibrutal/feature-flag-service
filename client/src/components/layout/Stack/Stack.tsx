import styles from "./Stack.module.css";

type Props = {
  children: React.ReactNode;
};

export function Stack({ children }: Props) {
  return <div className={styles.stack}>{children}</div>;
}
