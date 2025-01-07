import styles from './searchBar.module.css'

export default function SearchBar() {
  return (
    <div>
      <form
      className={styles.search_bar}
      action="">
        <input type="text" name="" id="" />
        <button>
            🔍
        </button>
      </form>
    </div>
  )
}