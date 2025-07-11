import { Component, ChangeDetectorRef, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-expense-crud',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './expense-crud.component.html',
  styleUrls: ['./expense-crud.component.css']
})
export class ExpenseCrudComponent implements OnInit {
  expenses: any[] = [];
  error = '';
  loading = false;
  form: any = {
    item: '',
    cost: '',
    expenseDate: '',
    category: '',
    description: '',
    paymentMethod: '',
    location: ''
  };
  editingId: number | null = null;

  @Output() onChange = new EventEmitter<void>();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.fetchExpenses();
  }

  getAuthHeader() {
    const token = localStorage.getItem('token');
    return { Authorization: `Bearer ${token}` };
  }

  fetchExpenses() {
    this.loading = true;
    axios.get('http://localhost:8080/api/expenses', { headers: this.getAuthHeader() })
      .then(res => {
        this.expenses = res.data;
        this.loading = false;
        this.cdr.markForCheck();
      })
      .catch(err => {
        this.error = err.response?.data?.message || 'Failed to fetch expenses.';
        this.loading = false;
        this.cdr.markForCheck();
      });
  }

  saveExpense() {
    const apiCall = this.editingId
      ? axios.put(`http://localhost:8080/api/expenses/${this.editingId}`, this.form, { headers: this.getAuthHeader() })
      : axios.post('http://localhost:8080/api/expenses', this.form, { headers: this.getAuthHeader() });

    apiCall
      .then(() => {
        this.form = {
          item: '',
          cost: '',
          expenseDate: '',
          category: '',
          description: '',
          paymentMethod: '',
          location: ''
        };
        this.editingId = null;
        this.fetchExpenses();
        this.onChange.emit();
      })
      .catch(err => {
        this.error = err.response?.data?.message || 'Failed to save expense.';
        this.cdr.markForCheck();
      });
  }

  editExpense(expense: any) {
    this.form = { ...expense };
    this.editingId = expense.id;
  }

  deleteExpense(id: number) {
    if (confirm('Delete this expense?')) {
      axios.delete(`http://localhost:8080/api/expenses/${id}`, { headers: this.getAuthHeader() })
        .then(() => {
          this.fetchExpenses();
          this.onChange.emit();
        })
        .catch(err => {
          this.error = err.response?.data?.message || 'Failed to delete expense.';
          this.cdr.markForCheck();
        });
    }
  }
}
