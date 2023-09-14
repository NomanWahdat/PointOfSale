# PointOfSale
 point of sale (POS) is the location where a customer makes a payment for goods or services. It is also the time and place at which a retail transaction is completed. The POS system is the hardware and software that enables the merchant to process transactions, track inventory, and manage customer data.

# Entity in the System 
	Customer
	Supplier
	Item
	Bill
	User
# User
User are of two type Admin an simple user. Admin and SUser can make sale bill and anyother task if the admin give access to it Admi can give access of a specific task to simple SUser or every SUser 

~Admin
Admin can make sale and purchase bill customer account and supplier account and make credit bill can change password and username of the SUser and can see per day profit and overall profit , Sale and Purchase . can return item , can add expense , can add return item to scrape or stock , can give salary , can check statemen of any salesman and purchaser 

~Simple User 
can do every task above but it depend upon the admin that of which task he want that SUser can do

# Customer
SUser or Admin will make account of the Customer and the bill will save under the customer name the item,their quantity , total bill and we can also see that total sale to that customer,Total profit,the statement and each statement contain each item he/she buy in that bill ,total bill and the amount he/she pays plus bill idand we can see how many time he buy certain item and how much quantity and how much he give profit in that item , the last three rate un which the certain item is saled to that customer

# Supplier
SUser or Admin will make account of the Supplier and the bill will save under the Supplier name the item,their quantity , total bill and we can also see that total purchase to that Supplier,the statement and each statement contain each item he/she supply in that bill ,total bill and the amount he/she pays plus bill id and descount we give on that certain bill na dtotal discount we give to that customer and we can see how many time we buy certain item and how much quantity

# Item
Item Quantity , in which Stock the item is placed , purchase rate , supplier name , the date in which we buy that item the profit that item give in total 

# Bill
in bill we select customer then item and then select stock or if we select the specific stock then profit is calculated based on that stock rate and if we select all stock then it will calculate the profit based on the average value and it based on admin if he want (it can select all the stock then) then quantity is removed from the oldest stock and profit is also calculated based on the oldest stock purchase value (in the second version their are two bill counter bill or bilty bill if the customer pay all the amount then we add it bill to do list which mean that his item has to bilty in that day or if the customer tell that sedn me by item on the certain date we will add date in that bill onthat day his builty notification will apear in to do list and if the user doesnot pay the amount then it depend on the admin that he allowed it to send him item on credit) if the bill is made by name then we enable the option promise date to return the amount and on that bill will apear on to do list on that mention date 


