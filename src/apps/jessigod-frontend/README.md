# 傑西神教福音

![jessigod](./logo.jpg)

網站： https://jessigod.marco79423.net/

## 實作相關

### 前端

使用 next.js / Material-UI 開發。

#### 專案架構

    packages.json
    next.config.js

    public/                          # 靜態檔案
    pages/                           # 頁面
        index.js                     # 首頁
        api/                         # 後端 API 轉發
    core/                            # 功能 (無關 React)
        features/                    # 核心功能
            secretKeyManager.js
            sayingsManager.js
            ...
        utils/                       # 工具包
            generateRandomString.js
            ...
    components/
        layouts/                     # 頁面佈局
        features/                    # 功能組件
            AboutGod/
            MainBanner/
            ...
        base/                        # 基礎組件
            ...
        hooks/                       # 組件 hook
            useSecretKey.js          # 使用 SecretKey 的 Hook
            ...
