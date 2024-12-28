import React from "react";
import "./Expense.css";
import ExpenseItem from "./ExpenseItem";
import {MdDelete} from 'react-icons/md';

//export class ExpenseList extends Component{
const ExpenseList = ({handleDelete , initialExpense,handleEdit,clearItem}) => {
    console.log(initialExpense);
    return(
        <>
            <ul className="list">
                {/* ExpenseItem */}
                {initialExpense.map(expense => {
                    return(
                        <ExpenseItem 
                        expense={expense}
                        key={expense.id}
                        handleDelete={handleDelete}
                        handleEdit={handleEdit}
                        />
                    )
                })}
                
            </ul>
            {
            initialExpense.length >0 &&(
                <button className="btn" onClick={clearItem}>목록지우기
                <MdDelete className="btn-icon" />
                </button>
            )
            }
        </>
    )
    
}

export default ExpenseList