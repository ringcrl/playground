# K线图最低点线性拟合

from futu import *

import numpy as np

quote_ctx = OpenQuoteContext(host='127.0.0.1', port=11111)

all_data = []

ret, data, page_req_key = quote_ctx.request_history_kline(
    'HK.00700',
    start='2020-09-15',
    end='2020-11-27',
    max_count=1000,
)
if ret == RET_OK:
    index = 0
    for _ in data['low']:
        item = {}
        low = data['low'][index]
        date = data['time_key'][index]
        item['low'] = low
        item['date'] = date
        item['index'] = index
        all_data.append(item)
        index += 1

# def getAB(x1, y1, x2, y2):
#   a = (y1 - y2) / (x1 - x2)
#   b = y1 - a * x1
#   return a, b


# def getTwoPoint():
#   i = 0
#   j = i + 1
#   resList = []
#   while (i < len(all_data)):
#     while (j < len(all_data)):
#       x1 = all_data[i]['index']
#       y1 = all_data[i]['low']
#       x2 = all_data[j]['index']
#       y2 = all_data[j]['low']
#       a, b = getAB(x1, y1, x2, y2)

#       checked_len = 0
#       for item in all_data:
#         if item['low'] > (a * item['index'] + b):
#           checked_len += 1

#       if checked_len == len(all_data) - 2:
#         resList.append({
#           'point1': all_data[i],
#           'point2': all_data[j],
#           'a': a,
#           'b': b
#         })

#       j += 1
#     i += 1
#     j = i + 1

#   if len(resList) > 0:
#     return resList
#   else:
#     return None

def linefit():
  X = [ item['index'] for item in all_data ]
  Y = data['low'].to_list()
  z1 = np.polyfit(X, Y, 1) # 一次多项式拟合，相当于线性拟合
  p1 = np.poly1d(z1)
  print(p1)

linefit()


quote_ctx.close() # 结束后记得关闭当条连接，防止连接条数用尽
