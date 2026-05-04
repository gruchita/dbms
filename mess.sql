-- =========================================
-- 1. Create & Use Database
-- =========================================
CREATE DATABASE IF NOT EXISTS HostelMessDB;
USE HostelMessDB;

-- =========================================
-- 2. Drop Existing Tables (Clean Setup)
-- =========================================
DROP TABLE IF EXISTS Stock_Usage;
DROP TABLE IF EXISTS Purchases;
DROP TABLE IF EXISTS Feedback;
DROP TABLE IF EXISTS Billing;
DROP TABLE IF EXISTS Menu;
DROP TABLE IF EXISTS Attendance;
DROP TABLE IF EXISTS Student_Meal;
DROP TABLE IF EXISTS Meal_Plan;
DROP TABLE IF EXISTS Students;
DROP TABLE IF EXISTS Inventory;

-- =========================================
-- 3. Core Tables
-- =========================================

-- Students
CREATE TABLE Students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    hostel_block VARCHAR(10),
    room_no INT,
    contact VARCHAR(15)
);

-- Meal Plan
CREATE TABLE Meal_Plan (
    plan_id INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('Veg', 'Non-Veg') NOT NULL,
    monthly_cost DECIMAL(8,2) NOT NULL
);

-- Student Meal Mapping
CREATE TABLE Student_Meal (
    student_id INT PRIMARY KEY,
    plan_id INT,
    FOREIGN KEY (student_id) REFERENCES Students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (plan_id) REFERENCES Meal_Plan(plan_id)
);

-- Attendance
CREATE TABLE Attendance (
    attendance_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    date DATE,
    meal_type ENUM('Breakfast', 'Lunch', 'Dinner'),
    status ENUM('Present', 'Absent'),
    FOREIGN KEY (student_id) REFERENCES Students(student_id) ON DELETE CASCADE
);

-- Menu
CREATE TABLE Menu (
    menu_id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE,
    meal_type ENUM('Breakfast', 'Lunch', 'Dinner'),
    items TEXT
);

-- Billing
CREATE TABLE Billing (
    bill_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    month VARCHAR(20),
    total_amount DECIMAL(10,2),
    payment_status ENUM('Paid', 'Unpaid'),
    FOREIGN KEY (student_id) REFERENCES Students(student_id)
);

-- Feedback
CREATE TABLE Feedback (
    feedback_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comments TEXT,
    date DATE,
    FOREIGN KEY (student_id) REFERENCES Students(student_id)
);

-- =========================================
-- 4. Inventory Module
-- =========================================

-- Inventory
CREATE TABLE Inventory (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    item_name VARCHAR(100) NOT NULL,
    unit VARCHAR(20),
    current_quantity DECIMAL(10,2) DEFAULT 0
);

-- Purchases (Stock In)
CREATE TABLE Purchases (
    purchase_id INT AUTO_INCREMENT PRIMARY KEY,
    item_id INT,
    quantity_added DECIMAL(10,2),
    purchase_date DATE,
    supplier VARCHAR(100),
    FOREIGN KEY (item_id) REFERENCES Inventory(item_id) ON DELETE CASCADE
);

-- Stock Usage (Stock Out)
CREATE TABLE Stock_Usage (
    usage_id INT AUTO_INCREMENT PRIMARY KEY,
    item_id INT,
    quantity_used DECIMAL(10,2),
    usage_date DATE,
    FOREIGN KEY (item_id) REFERENCES Inventory(item_id) ON DELETE CASCADE
);

-- =========================================
-- 5. Triggers
-- =========================================

DELIMITER $$

-- Update stock after purchase
CREATE TRIGGER trg_after_purchase
AFTER INSERT ON Purchases
FOR EACH ROW
BEGIN
    UPDATE Inventory
    SET current_quantity = current_quantity + NEW.quantity_added
    WHERE item_id = NEW.item_id;
END $$

-- Update stock after usage
CREATE TRIGGER trg_after_usage
AFTER INSERT ON Stock_Usage
FOR EACH ROW
BEGIN
    UPDATE Inventory
    SET current_quantity = current_quantity - NEW.quantity_used
    WHERE item_id = NEW.item_id;
END $$

-- Update billing after attendance
CREATE TRIGGER trg_update_bill
AFTER INSERT ON Attendance
FOR EACH ROW
BEGIN
    IF NEW.status = 'Present' THEN
        UPDATE Billing
        SET total_amount = total_amount + 50
        WHERE student_id = NEW.student_id
        AND month = 'April';
    END IF;
END $$

DELIMITER ;

