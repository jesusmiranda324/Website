#Budget Tracking System Vers 2.

starting_Budget = 150_000_000 #Starting Budget never specified by Prof. Best

team_Budgets = {
    "Team A": starting_Budget,
    "Team B": starting_Budget,
    "Team C": starting_Budget,
    "Team D": starting_Budget,
    "Team E": starting_Budget,
    "Team F": starting_Budget
}

def draft_Player(current_Team, player_Salary):
    if player_Salary < 0:
        return False
        
    if player_Salary <= team_Budgets[current_Team]:
        team_Budgets[current_Team] -= player_Salary
        return True
        
    return False



#Test 
#print(draft_Player("Team A", 200_000_000))
#print(draft_Player("Team A", 20_000_000))
#print(team_Budgets["Team A"])