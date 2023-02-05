
def twosum(nums, t, s):

        d = {}

        for i, n in enumerate(nums):
            # if n==s: continue
            diff = t - n

            if diff in d and s not in [i, d[diff]]:
                return [i, d[diff]]
                 
            d[n] = i

        return [-1, -1]


def longestConsecutive(nums):
    res = set()
        for i, n in enumerate(nums):
            a, b = twosum(nums, -n, i)

            if a==-1 and b==-1:
                continue
            elif a!=b and b!=i and i!=a:
                res.add(tuple(sorted([nums[a],nums[b],n])))

        return [list(r) for r in res]

print(longestConsecutive([-1,0,1,2,-1,-4,-2,-3,3,0,4]))