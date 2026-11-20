const VOTE_SHARES_CSV = `state,year,dem,rep,third
Alabama,1988,38.4,60.6,1.0
Alabama,1992,40.9,47.6,11.5
Alabama,1996,43.2,50.1,6.7
Alabama,2000,41.6,56.5,1.9
Alabama,2004,36.8,62.5,0.7
Alabama,2008,38.7,60.3,1.0
Alabama,2012,38.4,60.6,1.0
Alabama,2016,34.4,62.1,3.5
Alabama,2020,36.6,62.0,1.4
Alabama,2024,34.1,64.6,1.3
Alaska,1988,36.3,59.6,3.8
Alaska,1992,30.3,39.5,30.2
Alaska,1996,33.3,50.8,15.9
Alaska,2000,27.7,58.6,13.7
Alaska,2004,35.5,61.1,3.4
Alaska,2008,37.9,59.4,2.7
Alaska,2012,40.8,54.8,4.4
Alaska,2016,36.6,51.3,12.1
Alaska,2020,42.8,52.8,4.4
Alaska,2024,41.4,54.5,4.1
Arizona,1988,38.7,60.0,2.3
Arizona,1992,36.5,38.5,25.0
Arizona,1996,46.5,44.3,9.2
Arizona,2000,44.7,51.0,4.3
Arizona,2004,44.4,54.9,0.7
Arizona,2008,45.1,53.6,1.3
Arizona,2012,44.6,53.7,1.7
Arizona,2016,45.1,48.7,6.2
Arizona,2020,49.4,49.1,1.5
Arizona,2024,46.7,52.2,1.1
Arkansas,1988,42.2,56.4,1.4
Arkansas,1992,53.2,35.5,11.3
Arkansas,1996,53.7,36.8,9.5
Arkansas,2000,45.9,51.3,2.8
Arkansas,2004,44.6,54.3,1.1
Arkansas,2008,38.9,58.7,2.4
Arkansas,2012,36.9,60.6,2.5
Arkansas,2016,33.7,60.6,5.7
Arkansas,2020,34.8,62.4,2.8
Arkansas,2024,33.6,64.2,2.2
California,1988,47.6,51.1,1.3
California,1992,46.0,32.6,21.4
California,1996,51.1,38.2,10.7
California,2000,53.5,41.7,4.8
California,2004,54.3,44.4,1.3
California,2008,61.0,37.0,2.0
California,2012,60.2,37.1,2.7
California,2016,61.7,31.6,6.7
California,2020,63.5,34.3,2.2
California,2024,58.3,38.3,3.4
Colorado,1988,45.3,53.1,1.6
Colorado,1992,40.1,35.9,24.0
Colorado,1996,44.4,45.8,9.8
Colorado,2000,42.4,50.8,6.8
Colorado,2004,47.0,51.7,1.3
Colorado,2008,53.7,44.7,1.6
Colorado,2012,51.5,46.1,2.4
Colorado,2016,48.2,43.3,8.5
Colorado,2020,55.4,41.9,2.7
Colorado,2024,54.1,43.1,2.8
Connecticut,1988,46.9,52.0,1.1
Connecticut,1992,42.2,35.8,22.0
Connecticut,1996,52.8,34.7,12.5
Connecticut,2000,55.9,38.4,5.7
Connecticut,2004,54.3,44.0,1.7
Connecticut,2008,60.6,38.2,1.2
Connecticut,2012,58.1,40.7,1.2
Connecticut,2016,54.6,40.9,4.5
Connecticut,2020,59.2,39.2,1.6
Connecticut,2024,56.4,41.9,1.7
Delaware,1988,43.5,55.9,0.6
Delaware,1992,43.5,35.3,21.2
Delaware,1996,51.8,36.6,11.6
Delaware,2000,55.0,41.9,3.1
Delaware,2004,53.4,45.8,0.8
Delaware,2008,61.9,37.0,1.1
Delaware,2012,58.6,40.0,1.4
Delaware,2016,53.1,41.7,5.2
Delaware,2020,58.7,39.8,1.5
Delaware,2024,56.5,41.8,1.7
Florida,1988,38.5,60.9,0.6
Florida,1992,39.0,40.9,20.1
Florida,1996,48.0,42.3,9.7
Florida,2000,48.8,48.9,2.3
Florida,2004,47.1,52.1,0.8
Florida,2008,51.0,48.2,0.8
Florida,2012,50.0,49.1,0.9
Florida,2016,47.8,49.0,3.2
Florida,2020,47.9,51.2,0.9
Florida,2024,43.0,56.1,0.9
Georgia,1988,39.5,59.8,0.7
Georgia,1992,43.5,42.9,13.6
Georgia,1996,45.8,47.0,7.2
Georgia,2000,43.0,54.7,2.3
Georgia,2004,41.4,58.0,0.6
Georgia,2008,47.0,52.2,0.8
Georgia,2012,45.5,53.3,1.2
Georgia,2016,45.6,50.8,3.6
Georgia,2020,49.5,49.3,1.2
Georgia,2024,48.5,50.7,0.8
Hawaii,1988,54.3,44.8,0.9
Hawaii,1992,48.1,36.7,15.2
Hawaii,1996,56.9,31.6,11.5
Hawaii,2000,55.8,37.5,6.7
Hawaii,2004,54.0,45.3,0.7
Hawaii,2008,71.9,26.6,1.5
Hawaii,2012,70.6,27.8,1.6
Hawaii,2016,62.2,30.0,7.8
Hawaii,2020,63.7,34.3,2.0
Hawaii,2024,60.6,37.5,1.9
Idaho,1988,36.0,62.1,1.9
Idaho,1992,28.4,42.0,29.6
Idaho,1996,33.6,52.2,14.2
Idaho,2000,27.6,67.2,5.2
Idaho,2004,30.3,68.4,1.3
Idaho,2008,36.1,61.5,2.4
Idaho,2012,32.6,64.5,2.9
Idaho,2016,27.5,59.3,13.2
Idaho,2020,33.1,63.9,3.0
Idaho,2024,30.4,66.9,2.7
Illinois,1988,48.6,50.7,0.7
Illinois,1992,48.6,34.3,17.1
Illinois,1996,54.3,36.8,8.9
Illinois,2000,54.6,42.6,2.8
Illinois,2004,54.8,44.5,0.7
Illinois,2008,61.9,36.8,1.3
Illinois,2012,57.6,40.7,1.7
Illinois,2016,55.8,38.8,5.4
Illinois,2020,57.5,40.6,1.9
Illinois,2024,54.4,43.5,2.1
Indiana,1988,39.7,59.8,0.5
Indiana,1992,36.8,42.9,20.3
Indiana,1996,41.6,47.1,11.3
Indiana,2000,41.0,56.7,2.3
Indiana,2004,39.3,59.9,0.8
Indiana,2008,50.0,48.9,1.1
Indiana,2012,43.9,54.1,2.0
Indiana,2016,37.8,56.9,5.3
Indiana,2020,41.0,57.0,2.0
Indiana,2024,39.4,58.8,1.8
Iowa,1988,54.7,44.5,0.8
Iowa,1992,43.3,37.3,19.4
Iowa,1996,50.3,39.9,9.8
Iowa,2000,48.5,48.2,3.3
Iowa,2004,49.2,49.9,0.9
Iowa,2008,53.9,44.4,1.7
Iowa,2012,52.0,46.2,1.8
Iowa,2016,41.7,51.2,7.1
Iowa,2020,44.9,53.1,2.0
Iowa,2024,42.5,55.7,1.8
Kansas,1988,42.6,55.8,1.6
Kansas,1992,33.7,38.9,27.4
Kansas,1996,36.1,54.3,9.6
Kansas,2000,37.2,58.0,4.8
Kansas,2004,36.6,62.0,1.4
Kansas,2008,41.6,56.5,1.9
Kansas,2012,38.0,59.7,2.3
Kansas,2016,36.1,56.2,7.7
Kansas,2020,41.6,56.2,2.2
Kansas,2024,41.1,55.4,3.5
Kentucky,1988,43.88,55.52,0.6
Kentucky,1992,44.55,41.34,14.11
Kentucky,1996,45.84,44.88,9.28
Kentucky,2000,41.37,56.5,2.13
Kentucky,2004,39.69,59.55,0.76
Kentucky,2008,41.17,57.4,1.43
Kentucky,2012,37.8,60.49,1.71
Kentucky,2016,32.68,62.52,4.8
Kentucky,2020,36.15,62.09,1.76
Kentucky,2024,33.94,64.47,1.59
Louisiana,1988,44.1,54.3,1.6
Louisiana,1992,45.6,41.0,13.4
Louisiana,1996,52.0,39.9,8.1
Louisiana,2000,44.9,52.6,2.5
Louisiana,2004,42.2,56.7,1.1
Louisiana,2008,39.9,58.6,1.5
Louisiana,2012,40.6,57.8,1.6
Louisiana,2016,38.5,58.1,3.4
Louisiana,2020,39.9,58.5,1.6
Louisiana,2024,38.2,60.2,1.6
Maine,1988,43.88,55.34,0.78
Maine,1992,38.77,30.39,30.84
Maine,1996,51.57,30.76,17.67
Maine,2000,49.09,44.02,6.89
Maine,2004,53.56,44.58,1.86
Maine,2008,57.71,40.38,1.91
Maine,2012,56.27,40.98,2.75
Maine,2016,47.83,44.87,7.3
Maine,2020,53.09,44.0,2.91
Maine,2024,52.4,45.46,2.14
Maryland,1988,48.2,51.1,0.7
Maryland,1992,49.8,35.6,14.6
Maryland,1996,54.3,38.3,7.4
Maryland,2000,56.5,40.3,3.2
Maryland,2004,55.9,42.9,1.2
Maryland,2008,61.9,36.5,1.6
Maryland,2012,62.0,35.9,2.1
Maryland,2016,60.3,33.9,5.8
Maryland,2020,65.4,32.2,2.4
Maryland,2024,62.6,34.1,3.3
Massachusetts,1988,53.2,45.4,1.4
Massachusetts,1992,47.5,29.0,23.5
Massachusetts,1996,61.5,28.1,10.4
Massachusetts,2000,59.8,32.5,7.7
Massachusetts,2004,61.9,36.8,1.3
Massachusetts,2008,61.8,36.0,2.2
Massachusetts,2012,60.7,37.5,1.8
Massachusetts,2016,60.0,32.8,7.2
Massachusetts,2020,65.6,32.1,2.3
Massachusetts,2024,61.2,36.0,2.8
Michigan,1988,45.7,53.6,0.7
Michigan,1992,43.8,36.4,19.8
Michigan,1996,51.7,38.5,9.8
Michigan,2000,51.3,46.2,2.5
Michigan,2004,51.2,47.8,1.0
Michigan,2008,57.4,41.0,1.6
Michigan,2012,54.2,44.7,1.1
Michigan,2016,47.3,47.5,5.2
Michigan,2020,50.6,47.8,1.6
Michigan,2024,48.3,49.7,2.0
Minnesota,1988,52.9,45.9,1.2
Minnesota,1992,43.5,31.9,24.6
Minnesota,1996,51.1,35.0,13.9
Minnesota,2000,47.9,45.5,6.6
Minnesota,2004,51.1,47.6,1.3
Minnesota,2008,54.1,43.8,2.1
Minnesota,2012,52.7,45.0,2.3
Minnesota,2016,46.4,44.9,8.7
Minnesota,2020,52.4,45.3,2.3
Minnesota,2024,51.0,45.7,3.3
Mississippi,1988,39.1,59.9,1.0
Mississippi,1992,40.8,49.7,9.5
Mississippi,1996,44.1,49.2,6.7
Mississippi,2000,40.7,57.6,1.7
Mississippi,2004,39.6,59.4,1.0
Mississippi,2008,43.0,56.2,0.8
Mississippi,2012,43.8,55.3,0.9
Mississippi,2016,40.1,57.9,2.0
Mississippi,2020,41.1,57.6,1.3
Mississippi,2024,38.0,60.9,1.1
Missouri,1988,47.8,51.8,0.4
Missouri,1992,44.1,33.9,22.0
Missouri,1996,47.5,41.2,11.3
Missouri,2000,47.1,50.4,2.5
Missouri,2004,46.1,53.3,0.6
Missouri,2008,49.3,49.4,1.3
Missouri,2012,44.4,53.8,1.8
Missouri,2016,38.1,56.4,5.5
Missouri,2020,41.4,56.8,1.8
Missouri,2024,40.1,58.5,1.4
Montana,1988,46.2,52.1,1.7
Montana,1992,37.6,35.1,27.3
Montana,1996,41.2,44.1,14.7
Montana,2000,33.4,58.4,8.2
Montana,2004,38.6,59.1,2.3
Montana,2008,47.3,49.5,3.2
Montana,2012,41.7,55.4,2.9
Montana,2016,35.8,56.2,8.0
Montana,2020,40.6,56.9,2.5
Montana,2024,38.5,58.4,3.1
Nebraska,1988,39.2,60.2,0.6
Nebraska,1992,29.4,46.6,24.0
Nebraska,1996,35.0,53.7,11.3
Nebraska,2000,33.3,62.4,4.3
Nebraska,2004,32.7,65.9,1.4
Nebraska,2008,41.6,56.5,1.9
Nebraska,2012,38.0,59.8,2.2
Nebraska,2016,33.7,58.8,7.5
Nebraska,2020,39.2,58.2,2.6
Nebraska,2024,38.9,59.3,1.8
Nevada,1988,37.9,58.9,3.2
Nevada,1992,37.3,34.7,28.0
Nevada,1996,43.9,42.9,13.2
Nevada,2000,45.9,49.5,4.6
Nevada,2004,47.9,50.5,1.6
Nevada,2008,55.1,42.7,2.2
Nevada,2012,52.4,45.7,1.9
Nevada,2016,47.9,45.5,6.6
Nevada,2020,50.1,47.7,2.2
Nevada,2024,47.5,50.6,1.9
New Hampshire,1988,36.3,62.4,1.3
New Hampshire,1992,38.9,37.7,23.4
New Hampshire,1996,49.3,39.4,11.3
New Hampshire,2000,46.8,48.1,5.1
New Hampshire,2004,50.2,48.9,0.9
New Hampshire,2008,54.1,44.5,1.4
New Hampshire,2012,52.0,46.4,1.6
New Hampshire,2016,46.8,46.5,6.7
New Hampshire,2020,52.7,45.4,1.9
New Hampshire,2024,50.7,47.9,1.4
New Jersey,1988,42.6,56.2,1.2
New Jersey,1992,43.0,40.6,16.4
New Jersey,1996,53.7,35.9,10.4
New Jersey,2000,56.1,40.3,3.6
New Jersey,2004,52.9,46.2,0.9
New Jersey,2008,57.3,41.7,1.0
New Jersey,2012,58.4,40.6,1.0
New Jersey,2016,55.5,41.4,3.1
New Jersey,2020,57.3,41.4,1.3
New Jersey,2024,52.0,46.1,1.9
New Mexico,1988,46.9,51.9,1.2
New Mexico,1992,45.9,37.3,16.8
New Mexico,1996,49.2,41.9,8.9
New Mexico,2000,47.9,47.9,4.2
New Mexico,2004,49.1,49.8,1.1
New Mexico,2008,56.9,41.8,1.3
New Mexico,2012,53.0,42.8,4.2
New Mexico,2016,48.3,40.0,11.7
New Mexico,2020,54.3,43.5,2.2
New Mexico,2024,51.9,45.9,2.2
New York,1988,51.6,47.5,0.9
New York,1992,49.7,33.9,16.4
New York,1996,59.5,30.6,9.9
New York,2000,60.2,35.2,4.6
New York,2004,58.4,40.1,1.5
New York,2008,62.9,36.0,1.1
New York,2012,63.4,35.2,1.4
New York,2016,59.0,36.5,4.5
New York,2020,60.9,37.8,1.3
New York,2024,55.9,43.3,0.8
North Carolina,1988,41.7,58.0,0.3
North Carolina,1992,42.7,43.4,13.9
North Carolina,1996,44.0,48.7,7.3
North Carolina,2000,43.2,56.0,0.8
North Carolina,2004,43.6,56.0,0.4
North Carolina,2008,49.7,49.4,0.9
North Carolina,2012,48.4,50.4,1.2
North Carolina,2016,46.2,49.8,4.0
North Carolina,2020,48.6,49.9,1.5
North Carolina,2024,47.8,51.0,1.2
North Dakota,1988,43.0,56.0,1.0
North Dakota,1992,32.2,44.2,23.6
North Dakota,1996,40.1,46.9,12.9
North Dakota,2000,33.1,60.7,6.3
North Dakota,2004,35.5,62.9,1.6
North Dakota,2008,44.6,53.3,2.1
North Dakota,2012,38.7,58.3,3.0
North Dakota,2016,27.2,63.0,9.8
North Dakota,2020,31.8,65.1,3.1
North Dakota,2024,30.5,67.0,2.5
Ohio,1988,44.2,55.0,0.9
Ohio,1992,40.2,38.4,21.5
Ohio,1996,47.4,41.0,11.6
Ohio,2000,46.5,50.0,3.6
Ohio,2004,48.7,50.8,0.5
Ohio,2008,51.5,46.9,1.6
Ohio,2012,50.7,47.7,1.6
Ohio,2016,43.6,51.7,4.7
Ohio,2020,45.2,53.3,1.5
Ohio,2024,43.9,55.1,0.9
Oklahoma,1988,41.3,57.9,0.8
Oklahoma,1992,34.0,42.7,23.3
Oklahoma,1996,40.5,48.3,11.2
Oklahoma,2000,38.4,60.3,1.3
Oklahoma,2004,34.4,65.6,0.0
Oklahoma,2008,34.4,65.6,0.0
Oklahoma,2012,33.2,66.8,0.0
Oklahoma,2016,28.9,65.3,5.8
Oklahoma,2020,32.3,65.4,2.3
Oklahoma,2024,31.6,66.2,2.2
Oregon,1988,51.3,46.6,2.1
Oregon,1992,42.5,32.5,25.0
Oregon,1996,47.2,39.1,13.8
Oregon,2000,47.0,46.5,6.5
Oregon,2004,51.4,47.2,1.5
Oregon,2008,56.7,40.4,2.9
Oregon,2012,54.2,42.2,3.6
Oregon,2016,50.1,39.1,10.8
Oregon,2020,56.5,40.4,3.2
Oregon,2024,55.6,41.2,3.2
Pennsylvania,1988,48.4,50.7,0.9
Pennsylvania,1992,45.1,36.1,18.7
Pennsylvania,1996,49.2,40.0,10.8
Pennsylvania,2000,50.6,46.4,3.0
Pennsylvania,2004,50.9,48.4,0.7
Pennsylvania,2008,54.5,44.2,1.4
Pennsylvania,2012,52.0,46.6,1.4
Pennsylvania,2016,47.5,48.2,4.3
Pennsylvania,2020,50.0,48.8,1.2
Pennsylvania,2024,48.7,50.4,0.9
Rhode Island,1988,55.6,43.9,0.4
Rhode Island,1992,47.0,29.0,23.9
Rhode Island,1996,59.7,26.8,13.5
Rhode Island,2000,61.0,31.9,7.1
Rhode Island,2004,59.4,38.7,1.9
Rhode Island,2008,62.9,35.1,2.1
Rhode Island,2012,62.7,35.2,2.1
Rhode Island,2016,54.4,38.9,6.7
Rhode Island,2020,59.4,38.6,2.0
Rhode Island,2024,55.5,41.8,2.7
South Carolina,1988,37.6,61.5,0.9
South Carolina,1992,39.9,48.0,12.1
South Carolina,1996,44.0,49.8,6.2
South Carolina,2000,40.9,56.8,2.3
South Carolina,2004,40.9,58.0,1.1
South Carolina,2008,44.9,53.9,1.2
South Carolina,2012,44.1,54.6,1.3
South Carolina,2016,40.7,54.9,4.4
South Carolina,2020,43.4,55.1,1.5
South Carolina,2024,40.4,58.2,1.4
South Dakota,1988,46.5,52.8,0.7
South Dakota,1992,37.1,41.1,21.8
South Dakota,1996,43.0,46.5,10.5
South Dakota,2000,37.6,60.3,2.1
South Dakota,2004,38.4,59.9,1.7
South Dakota,2008,44.7,53.2,2.1
South Dakota,2012,39.9,57.9,2.2
South Dakota,2016,31.7,61.5,6.8
South Dakota,2020,35.6,61.8,2.6
South Dakota,2024,34.2,63.4,2.4
Tennessee,1988,41.5,57.9,0.6
Tennessee,1992,47.1,42.4,10.5
Tennessee,1996,48.0,45.6,6.4
Tennessee,2000,47.3,51.2,1.5
Tennessee,2004,42.5,56.8,0.7
Tennessee,2008,41.8,56.9,1.3
Tennessee,2012,39.1,59.5,1.4
Tennessee,2016,34.7,60.7,4.6
Tennessee,2020,37.5,60.7,1.8
Tennessee,2024,34.3,63.2,2.5
Texas,1988,43.4,56.0,0.7
Texas,1992,37.1,40.6,22.4
Texas,1996,43.8,48.8,7.4
Texas,2000,38.0,59.3,2.7
Texas,2004,38.2,61.1,0.7
Texas,2008,43.7,55.5,0.9
Texas,2012,41.4,57.2,1.5
Texas,2016,43.2,52.2,4.5
Texas,2020,46.5,52.1,1.5
Texas,2024,42.5,56.1,1.4
Utah,1988,32.1,66.2,1.7
Utah,1992,24.7,43.4,31.9
Utah,1996,33.3,54.4,12.3
Utah,2000,26.3,66.8,6.9
Utah,2004,26.0,71.5,2.5
Utah,2008,34.4,62.6,3.0
Utah,2012,24.7,72.8,2.5
Utah,2016,27.5,45.5,27.0
Utah,2020,37.6,58.1,4.3
Utah,2024,37.8,59.4,2.8
Vermont,1988,43.6,51.1,5.3
Vermont,1992,46.1,30.4,23.5
Vermont,1996,53.3,31.1,15.6
Vermont,2000,50.6,40.7,8.7
Vermont,2004,58.9,38.8,2.3
Vermont,2008,67.5,30.5,2.0
Vermont,2012,66.6,31.0,2.4
Vermont,2016,56.7,30.0,13.3
Vermont,2020,66.1,30.7,3.2
Vermont,2024,63.2,32.3,4.5
Virginia,1988,39.2,59.5,1.3
Virginia,1992,40.6,42.8,16.6
Virginia,1996,45.2,47.1,7.7
Virginia,2000,44.4,52.5,3.1
Virginia,2004,45.5,53.7,0.8
Virginia,2008,52.6,46.3,1.1
Virginia,2012,51.2,47.3,1.5
Virginia,2016,49.7,44.4,5.9
Virginia,2020,54.1,44.0,1.9
Virginia,2024,51.8,46.1,2.1
Washington,1988,50.1,48.5,1.4
Washington,1992,43.4,32.0,24.6
Washington,1996,49.8,37.3,12.9
Washington,2000,50.2,44.6,5.2
Washington,2004,52.8,45.6,1.6
Washington,2008,57.7,40.5,1.8
Washington,2012,56.2,41.3,2.5
Washington,2016,52.5,36.8,10.7
Washington,2020,58.0,38.8,3.2
Washington,2024,57.2,39.0,3.8
West Virginia,1988,47.5,51.9,0.6
West Virginia,1992,48.4,35.4,16.2
West Virginia,1996,51.5,36.8,11.7
West Virginia,2000,45.6,51.9,2.5
West Virginia,2004,43.2,56.1,0.7
West Virginia,2008,42.6,55.7,1.7
West Virginia,2012,35.5,62.1,2.4
West Virginia,2016,26.2,68.5,5.3
West Virginia,2020,29.7,68.6,1.7
West Virginia,2024,27.8,70.1,2.1
Wisconsin,1988,51.4,47.8,0.8
Wisconsin,1992,41.1,36.8,22.1
Wisconsin,1996,48.8,38.5,12.7
Wisconsin,2000,47.8,47.6,4.6
Wisconsin,2004,49.7,49.3,1.0
Wisconsin,2008,56.2,42.3,1.5
Wisconsin,2012,52.8,45.9,1.3
Wisconsin,2016,46.5,47.2,6.3
Wisconsin,2020,49.5,48.8,1.7
Wisconsin,2024,48.8,49.7,1.5
Wyoming,1988,38.0,60.5,1.5
Wyoming,1992,34.1,39.7,25.7
Wyoming,1996,36.8,49.8,12.3
Wyoming,2000,27.7,67.8,4.5
Wyoming,2004,29.1,68.9,2.0
Wyoming,2008,32.5,64.8,2.7
Wyoming,2012,27.8,68.6,3.6
Wyoming,2016,21.9,68.2,9.9
Wyoming,2020,26.6,69.9,3.5
Wyoming,2024,25.8,71.6,2.6
`;
