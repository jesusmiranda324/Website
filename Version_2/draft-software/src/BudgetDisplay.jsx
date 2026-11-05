function BudgetDisplay({ budget = 150000000 }) {
    return ( 
        <span
            style={{
                fontSize: "12px",
                color: "#555", 
                fontWeight: "500"
            }}
        >
            ${budget.toLocaleString()}
        </span>
    );
}

export default BudgetDisplay;