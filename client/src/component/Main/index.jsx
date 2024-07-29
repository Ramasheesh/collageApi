import  style  from "./style.module.css";

const main = () => {
   const handleLogout = ()=>{
    localStorage.removeItem('token');
    window.location.reload();
   }
  return (
    <div className={style.main_container}>
      <nav className={style.navbar}>
        <h1>facebook</h1>
        <button className={style.white_btn} onClick={handleLogout}></button>
      </nav>
    </div>
  );
};

export default main;