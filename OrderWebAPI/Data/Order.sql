SET IDENTITY_INSERT [dbo].[Orders] ON 
GO
INSERT [dbo].[Orders] ([OrderID], [ProductID], [ProductName], [OrderDate], [OrderStatus]) VALUES (1, 20024, N'Tommy Hilfiger Navy Blue Jeans for Men ', N'2021-01-12', N'Issued')
GO
INSERT [dbo].[Orders] ([OrderID], [ProductID], [ProductName], [OrderDate], [OrderStatus]) VALUES (2, 74662, N'Levis Black Jeans Women', N'2020-11-25', N'Issued')
GO
INSERT [dbo].[Orders] ([OrderID], [ProductID], [ProductName], [OrderDate], [OrderStatus]) VALUES (3, 11202, N'H&M Blue Demin Jacket for Men', N'2019-05-19', N'Cancelled')
GO
SET IDENTITY_INSERT [dbo].[Orders] OFF
GO
