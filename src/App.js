// Component
import { use, useState } from "react";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Alert from "./components/Alert";

  /** props() : 컴포넌트간 데이터 전달
   *  properties
   * 
  */
const App = () => {
  /*
  constructor(props){
    super(props);
    this.state = {
      expense : [
        {id:1, charge:"렌트비", amount:1600},
        {id:2, charge:"교통비", amount:400},
        {id:3, charge:"식비" , amount:1200}
      ]
    }
  }*/
  //항목
  const [charge,setCharge] = useState("");
  //비용
  const [amount ,setAmount] = useState(0);
  //지출리스트
  const [expense, setExpenses] = useState([]);
  //알림
  const [alert, setAlert] = useState({show:false});
  //수정할 항목
  const [id,setId] = useState('');
  //수정상태
  const [edit, setEdit] = useState(false);

  const handleCharge = (e) =>{
    setCharge(e.target.value);
    //console.log(e.target.value);
  }
  const handleAmount = (e) =>{
    setAmount(e.target.valueAsNumber);
    //console.log(e.target.valueAsNumber);
  }
  const handleDelete = (id) =>{
    //console.log(id);
    const newExpense = expense.filter(expense => expense.id != id);
    //console.log(newExpense);
    setExpenses(newExpense);
    //this.setState({expense:newExpense});
    /* React State : 리액트에서 데이터가 변할 때 화면을 다시 렌더링 */
    handleAlert({type:'danger',text:'항목을 삭제했습니다.'})
  }
  const handleSubmit = (e) =>{
    e.preventDefault();
    if(charge !== "" && amount >= 0){
      if(edit){
        //수정
        const newExpenses = expense.map(item => {
          return item.id === id ? {...item,charge,amount} :item
        })
        setExpenses(newExpenses);
        setEdit(false);
        setAmount(0);
        setCharge("");
        handleAlert({type:"success",text:"수정이 완료되었습니다."});
      }else{
        //추가
        const newExpense = {id:crypto.randomUUID(),charge,amount};
        const newExpenses = [...expense,newExpense]
        setExpenses(newExpenses);
        setCharge("");
        setAmount(0);
        handleAlert({type:"success" , text:"항목이 추가되었습니다."});
      }
    }else{
      console.log("error");
      handleAlert({type:"danger" , text:"데이터를 입력해주세요."});
    }
  }
  const handleAlert =({type,text}) =>{
    console.log(type)
    console.log(text)
    setAlert({show:true,type, text});
    console.log(alert);
    setTimeout(()=>{
      setAlert({show:false});
    },5000);
  }

  const handleEdit = (id) =>{
    const exp = expense.find(item => item.id === id);
    console.log(exp);
    setId(id);
    setCharge(exp.charge);
    setAmount(exp.amount);
    setEdit(true);
  }

  const clearItem = () =>{
    setExpenses([]);
  }
    return (
      <div className="main-container">
        {alert.show ? <Alert type={alert.type} text={alert.text}/>:null}
        <h1>예산계산기</h1>
        <div style={{width:'100%', backgroundColor:'white', padding:'1rem'}}>
          {/* 입력폼 */}
          <ExpenseForm 
                      handleCharge={handleCharge} 
                      charge={charge}
                      handleAmount={handleAmount}
                      amount={amount}
                      handleSubmit={handleSubmit}
                      edit={edit}
                      />
        </div>
        <div style={{width:'100%', backgroundColor:'white', padding:'1rem'}}>
          {/* 리스트 */}
          <ExpenseList 
                    initialExpense={expense} 
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    clearItem={clearItem}
                    />
        </div>
        <div style={{display:'flex' , justifyContent:'end',maginTop : '1rem'}}>
          <p style={{fontSize:'2rem'}}>
            총지출:<span>
              {/*.reduce() 배열의 각 요소에 대해 주어진 
              reducer 함수를 실행하고 하나의 결과값을 반환
              acc:누산기 , cur : 현재값, idx : 현재 인덱스, src : 원본배열
              */}
              {expense.reduce((acc, cur) => {
                return (acc += cur.amount);
              },0)}
              원</span>
          </p>

        </div>
      </div>
    )
  

}

export default App;