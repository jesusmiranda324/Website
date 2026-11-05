function BudgetDisplay({ budget = 150000000 }) {
    return ( 
        <span
            style={{
                fontSize: "12px",
                color: "#227f5d", 
                fontWeight: "500"
            }}
        >
            ${budget.toLocaleString()}
        </span>
    );
}

export default BudgetDisplay;