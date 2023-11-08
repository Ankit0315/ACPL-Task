-- Create the EmployeeDetails--

CREATE DATABASE EmployeeDetails;

GO

-- Use the EmployeeDetails---

USE EmployeeDetails;

GO

-- Create the Employees table--

CREATE TABLE Employees (
    Id INT PRIMARY KEY IDENTITY,
    FirstName NVARCHAR(255) NOT NULL,
    LastName NVARCHAR(255) NOT NULL,
    Designation NVARCHAR(255) NOT NULL
);

GO
-- Insert values to  the Employees table---

INSERT INTO Employees ( FirstName, LastName ,Designation)
VALUES ('Ankit', 'Rai', 'Frontend developer');

