/*COMPANY*/
insert into company (companyName)
values ('Stoaboch Wirt');
/*MANAGER*/
insert into manager (birthdate, email, firstname, lastname, password, telephone, company_id)
values ('2000-11-20 00:00:00', 'bernhard@penkner.com', 'Bernhard', 'Penkner', 'passwort', '+43677238384878', 1);
/*ROLE*/
insert into role (roleName, company_id)
values ('Koch', 1);
insert into role (roleName, company_id)
values ('Kellner', 1);
/*EMPLOYEE*/
insert into employee (birthdate, email, firstname, lastname, password, telephone, company_id)
values ('2004-11-11 00:00:00', 'john.doe@example.com', 'john', 'doe', 'hunter2', '1233456899', 1);
insert into employee (birthdate, email, firstname, lastname, password, telephone, company_id)
values ('2001-11-09 00:00:00', 'alexander.hahn@example.com', 'Alexander', 'Hahn', 'hunter34', '65626625', 1);
/*SHIFT*/
insert into Shift (starttime, endtime, company_id)
values ('2024-11-18 09:00:00', '2024-11-18 17:00:00', 1);
insert into Shift (starttime, endtime, company_id)
values ('2024-11-11 09:00:00', '2024-11-11 17:00:00', 1);

/*ASSOTIATIVE*/
insert into employee_role (employee_id, roles_id)
values (1, 1);
insert into employee_role (employee_id, roles_id)
values (2, 2);

insert into employeeshift (employee_id, shift_id)
values (1, 1);
insert into employeeshift (employee_id, shift_id)
values (1, 2);
insert into employeeshift (employee_id, shift_id)
values (2, 2);
insert into employeeshift (employee_id, shift_id)
values (2, 1);