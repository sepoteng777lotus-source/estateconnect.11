import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card.tsx';
import { Input } from './ui/input.tsx';
import { Label } from './ui/label.tsx';
import { Slider } from './ui/slider.tsx';
import { Calculator } from 'lucide-react';

export function AffordabilityCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState(30000);
  const [monthlyExpenses, setMonthlyExpenses] = useState(15000);
  const [interestRate, setInterestRate] = useState(11.5);
  const [loanTerm, setLoanTerm] = useState(20);
  const [deposit, setDeposit] = useState(100000);

  // Calculate affordability
  const monthlyDisposable = monthlyIncome - monthlyExpenses;
  const maxMonthlyPayment = monthlyDisposable * 0.3; // 30% of disposable income
  
  // Monthly interest rate
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTerm * 12;
  
  // Calculate max loan amount using mortgage formula
  const maxLoanAmount = monthlyRate > 0
    ? (maxMonthlyPayment * (Math.pow(1 + monthlyRate, numberOfPayments) - 1)) / (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))
    : maxMonthlyPayment * numberOfPayments;
  
  const maxPropertyPrice = maxLoanAmount + deposit;

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-2xl border-0 bg-card">
      <CardHeader className="space-y-3">
        <div className="flex items-center justify-center gap-3">
          <div className="p-2 bg-primary/20 rounded-lg">
            <Calculator className="h-6 w-6 text-card-foreground" />
          </div>
          <CardTitle className="text-card-foreground">Affordability Calculator</CardTitle>
        </div>
        <CardDescription className="text-center text-card-foreground/80">
          See how much home you can afford based on your income and expenses
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="income" className="text-card-foreground">Monthly Gross Income (R)</Label>
            <Input
              id="income"
              type="number"
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(Number(e.target.value))}
              className="bg-input-background text-card-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expenses" className="text-card-foreground">Monthly Expenses (R)</Label>
            <Input
              id="expenses"
              type="number"
              value={monthlyExpenses}
              onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
              className="bg-input-background text-card-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="deposit" className="text-card-foreground">Deposit Available (R)</Label>
            <Input
              id="deposit"
              type="number"
              value={deposit}
              onChange={(e) => setDeposit(Number(e.target.value))}
              className="bg-input-background text-card-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="rate" className="text-card-foreground">Interest Rate (%)</Label>
            <Input
              id="rate"
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="bg-input-background text-card-foreground"
            />
          </div>

          <div className="space-y-3 md:col-span-2">
            <Label className="text-card-foreground">Loan Term: {loanTerm} years</Label>
            <Slider
              value={[loanTerm]}
              onValueChange={(value) => setLoanTerm(value[0])}
              min={5}
              max={30}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-card-foreground/60">
              <span>5 years</span>
              <span>30 years</span>
            </div>
          </div>
        </div>

        <div className="bg-primary text-primary-foreground rounded-xl p-8 space-y-6 shadow-lg">
          <div className="text-center">
            <p className="mb-2">You can afford a home worth up to:</p>
            <p className="text-4xl tracking-tight">R {maxPropertyPrice.toLocaleString('en-ZA', { maximumFractionDigits: 0 })}</p>
          </div>
          
          <div className="grid grid-cols-2 gap-6 pt-6 border-t border-primary-foreground/20">
            <div className="text-center">
              <p className="text-sm mb-1">Estimated Monthly Payment</p>
              <p className="text-2xl">R {maxMonthlyPayment.toLocaleString('en-ZA', { maximumFractionDigits: 0 })}</p>
            </div>
            <div className="text-center">
              <p className="text-sm mb-1">Max Loan Amount</p>
              <p className="text-2xl">R {maxLoanAmount.toLocaleString('en-ZA', { maximumFractionDigits: 0 })}</p>
            </div>
          </div>
        </div>

        <p className="text-xs text-card-foreground/60">
          * This is an estimate only. Final approval depends on credit score, debt-to-income ratio, and bank policies. 
          Contact me for a personalized assessment.
        </p>
      </CardContent>
    </Card>
  );
}
