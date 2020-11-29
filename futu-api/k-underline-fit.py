# K线图最低点线性拟合

from futu import *

import numpy as np

quote_ctx = OpenQuoteContext(host='127.0.0.1', port=11111)

dataList = []

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
        high = data['high'][index]
        date = data['time_key'][index]
        item['low'] = low
        item['high'] = high
        item['date'] = date
        item['index'] = index
        dataList.append(item)
        index += 1

def getAB(x1, y1, x2, y2):
  a = (y1 - y2) / (x1 - x2)
  b = y1 - a * x1
  return a, b

def getTwoPoint(pointType='high|low'):
  i = 0
  j = i + 1
  resList = []
  while (i < len(dataList)):
    while (j < len(dataList)):
      x1 = dataList[i]['index']
      y1 = dataList[i][pointType]
      x2 = dataList[j]['index']
      y2 = dataList[j][pointType]
      a, b = getAB(x1, y1, x2, y2)

      checked_len = 0
      for item in dataList:
        if (pointType == 'low' and item['low'] > (a * item['index'] + b)):
          checked_len += 1
        elif (pointType == 'high' and item['high'] < (a * item['index'] + b)):
          checked_len += 1

      if checked_len == len(dataList) - 2:
        # 上升趋势只取斜率为正的曲线
        if a > 0:
          resList.append({
            'point1': dataList[i],
            'point2': dataList[j],
            'a': a,
            'b': b
          })

      j += 1
    i += 1
    j = i + 1

  if len(resList) > 0:
    return resList
  else:
    return None

# 不能采用线性拟合，结果不准
# def linefit():
#   X = [ item['index'] for item in dataList ]
#   Y = data['low'].to_list()
#   z1 = np.polyfit(X, Y, 1) # 一次多项式拟合，相当于线性拟合
#   p1 = np.poly1d(z1)
#   print(p1)

getTwoPoint(pointType='high')
getTwoPoint(pointType='low')

quote_ctx.close() # 结束后记得关闭当条连接，防止连接条数用尽
