# start backend sever
# uvicorn main:app --reload

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import os

app = FastAPI()

# this is for the CORS for frontend communication
# it is what is used to communicate with the front end to be able to
# display result on the localhost / your local machine
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# path to the csv file that is read within the project to relay results dynamically
csv_path = os.path.join(os.path.dirname(__file__), "VisaDataFinalComp 2.csv")

# loads the data off of being run
df = pd.read_csv(csv_path)

# ex USER_ID: http://localhost:8000/user/USER2572
@app.get("/user/{user_id}")
def get_user_insights(user_id: str):
    user_df = df[df['UserID'] == user_id]
 
    if user_df.empty:
        return {"message": "No data found for this UserID."}

    # algorithms to capture the best categrories for a specific user
    total_spent = round(user_df['Amount'].sum(), 2)
    avg_transaction = round(user_df['Amount'].mean(), 2)
    top_merchants = user_df['Merchant'].value_counts().head(3).to_dict()
    top_categories = user_df['Category'].value_counts().head(3).to_dict()
    recurring_counts = user_df['IsRecurring'].value_counts().to_dict()
    busiest_times = user_df['TimeOfDay'].value_counts().to_dict()

    return {
        "user_id": user_id,
        "total_spent": total_spent,
        "average_transaction": avg_transaction,
        "top_merchants": top_merchants,
        "top_categories": top_categories,
        "recurring_transaction_stats": recurring_counts,
        "busiest_times": busiest_times
    }
