/* eslint-disable */

import { plainToClass } from "class-transformer";
import ErrandCompany from "src/util/ErrandCompany";
import api from "../config/axios";

class ErrandAPIService {
  public static async getCompanyList() {
    return await this.getCompanyListByName();
  }

  public static async getCompanyListByName(_acQuery: string = ""): Promise<ErrandCompany[]> {
    let params = {};
    if (_acQuery && _acQuery.length > 0) {
      params = { acQuery: _acQuery };
    }

    const response = await api.get("/agency/errand/company/list.php", {
      params: params,
    });

    if (response.data && response.data.astErrandCompany) {
      return plainToClass(ErrandCompany, response.data.astErrandCompany as ErrandCompany[]);
    } else {
      return [];
    }
  }

  //   public static async getDetail(ulErrandSeqNo: number): Promise<Errand> {
  //     const params = {
  //       ulErrandSeqNo: ulErrandSeqNo,
  //     };

  //     const response = await APIHelper.getInstance().get("/shared/errand/detail.php", {
  //       params: params,
  //     });

  //     if (response.data && response.data.stErrand) {
  //       return plainToClass(Errand, response.data.stErrand);
  //     } else {
  //       return null;
  //     }
  //   }

  //   public static async postOrder(formData: FormData) {
  //     try {
  //       await APIHelper.getInstance().post("/agency/errand/order.v3.php", formData);

  //       return true;
  //     } catch (error) {
  //       if (error.response && error.response.data && error.response.data.msg) {
  //         throw new Error(error.response.data.msg);
  //       } else {
  //         throw new Error("서버에서 응답을 받지 못했습니다");
  //       }
  //     }
  //   }

  //   public static async putModify(params) {
  //     try {
  //       await APIHelper.getInstance().put("/agency/errand/order.v3.php", null, { params: params });

  //       return true;
  //     } catch (error) {
  //       if (error.response && error.response.data && error.response.data.msg) {
  //         throw new Error(error.response.data.msg);
  //       } else {
  //         throw new Error("서버에서 응답을 받지 못했습니다");
  //       }
  //     }
  //   }

  //   public static async postForceDispatch(ulErrandSeqNo: number, stRider: Rider) {
  //     try {
  //       const formData = new FormData();

  //       formData.append("ulErrandSeqNo", String(ulErrandSeqNo));

  //       formData.append("ucAcptAreaNo", String(stRider.ucAreaNo));
  //       formData.append("ucAcptDistribId", String(stRider.ucDistribId));
  //       formData.append("ucAcptAgencyId", String(stRider.ucAgencyId));
  //       formData.append("ucAcptMemCourId", String(stRider.ucMemCourId));

  //       await APIHelper.getInstance().post("/agency/errand/dispatch/index.php", formData);
  //     } catch (error) {
  //       if (error.response && error.response.data && error.response.data.msg) {
  //         throw new Error(error.response.data.msg);
  //       } else {
  //         throw new Error("서버에서 응답을 받지 못했습니다");
  //       }
  //     }
  //   }

  //   public static async postOptionalDispatch(ulErrandSeqNo: number, stRider: Rider) {
  //     try {
  //       const formData = new FormData();

  //       formData.append("ulErrandSeqNo", String(ulErrandSeqNo));

  //       formData.append("ucAcptAreaNo", String(stRider.ucAreaNo));
  //       formData.append("ucAcptDistribId", String(stRider.ucDistribId));
  //       formData.append("ucAcptAgencyId", String(stRider.ucAgencyId));
  //       formData.append("ucAcptMemCourId", String(stRider.ucMemCourId));

  //       await APIHelper.getInstance().post("/agency/errand/dispatch/optional.php", formData);
  //     } catch (error) {
  //       if (error.response && error.response.data && error.response.data.msg) {
  //         throw new Error(error.response.data.msg);
  //       } else {
  //         throw new Error("서버에서 응답을 받지 못했습니다");
  //       }
  //     }
  //   }

  //   public static async postDispatchCancel(ulErrandSeqNo: number) {
  //     try {
  //       const formData = new FormData();

  //       formData.append("ulErrandSeqNo", String(ulErrandSeqNo));

  //       await APIHelper.getInstance().post("/agency/errand/dispatch/cancel.php", formData);
  //     } catch (error) {
  //       if (error.response && error.response.data && error.response.data.msg) {
  //         throw new Error(error.response.data.msg);
  //       } else {
  //         throw new Error("서버에서 응답을 받지 못했습니다");
  //       }
  //     }
  //   }

  //   public static async postCancel(ulErrandSeqNo: number) {
  //     try {
  //       const formData = new FormData();

  //       formData.append("ulErrandSeqNo", String(ulErrandSeqNo));

  //       await APIHelper.getInstance().post("/agency/errand/cancel.php", formData);
  //     } catch (error) {
  //       if (error.response && error.response.data && error.response.data.msg) {
  //         throw new Error(error.response.data.msg);
  //       } else {
  //         throw new Error("서버에서 응답을 받지 못했습니다");
  //       }
  //     }
  //   }

  //   public static async postTempOrder(formData: FormData): Promise<void> {
  //     try {
  //       await APIHelper.getInstance().post("/franchise/errand/order.php", formData);
  //     } catch (error) {
  //       if (error.response && error.response.data && error.response.data.msg) {
  //         throw new Error(error.response.data.msg);
  //       } else {
  //         throw new Error("서버에서 응답을 받지 못했습니다");
  //       }
  //     }
  //   }

  //   public static async postDispatchChange(ulErrandSeqNo: number, stRider: Rider) {
  //     try {
  //       const formData = new FormData();

  //       formData.append("ulErrandSeqNo", String(ulErrandSeqNo));

  //       formData.append("ucAcptAreaNo", String(stRider.ucAreaNo));
  //       formData.append("ucAcptDistribId", String(stRider.ucDistribId));
  //       formData.append("ucAcptAgencyId", String(stRider.ucAgencyId));
  //       formData.append("ucAcptMemCourId", String(stRider.ucMemCourId));

  //       await APIHelper.getInstance().post("/agency/errand/dispatch/change.php", formData);
  //     } catch (error) {
  //       if (error.response && error.response.data && error.response.data.msg) {
  //         throw new Error(error.response.data.msg);
  //       } else {
  //         throw new Error("서버에서 응답을 받지 못했습니다");
  //       }
  //     }
  //   }
}

export default ErrandAPIService;
