def getQueryResults(n, queries):

    results = []

    #
    # We calculate the goodArray
    #
    goodArray = []
    powerIndex = -1

    while(n != 0):

        powerIndex = powerIndex + 1

        if((n % 2) == 1):
            goodArray.append(pow(2, powerIndex))

        n = (int) (n / 2)


    #
    # Now, we resolve the queries.
    #
    for i in range(0, len(queries)):

        l = queries[i][0]
        r = queries[i][1]
        m = queries[i][2]

        product = 1
        for j in range(l - 1, r):
            product = product * goodArray[j]

        results.append(product % m)


    return results

print(getQueryResults(6, [[1,2,4], [2,2,8], [1,1,4]]))