package com.icebreak.p2p.ws.enums;

import java.util.ArrayList;
import java.util.List;

public enum LoanBizTypeEnum {
	
	/** 所有人*/
	PUBLIC("public", "所有人"),
	/** 所有人*/
	YJF("YJF", "托管机构");
	
	/** 枚举值 */
	private final String	code;
	
	/** 枚举描述 */
	private final String	message;
	
	/**
	 * 构造一个<code>LoanBizTypeEnum</code>枚举对象
	 *
	 * @param code
	 * @param message
	 */
	private LoanBizTypeEnum(String code, String message) {
		this.code = code;
		this.message = message;
	}
	
	/**
	 * @return Returns the code.
	 */
	public String getCode() {
		return code;
	}
	
	/**
	 * @return Returns the message.
	 */
	public String getMessage() {
		return message;
	}
	
	/**
	 * @return Returns the code.
	 */
	public String code() {
		return code;
	}
	
	/**
	 * @return Returns the message.
	 */
	public String message() {
		return message;
	}
	
	/**
	 * 通过枚举<code>code</code>获得枚举
	 *
	 * @param code
	 * @return LoanBizTypeEnum
	 */
	public static LoanBizTypeEnum getByCode(String code) {
		for (LoanBizTypeEnum _enum : values()) {
			if (_enum.getCode().equals(code)) {
				return _enum;
			}
		}
		return null;
	}
	
	/**
	 * 获取全部枚举
	 * 
	 * @return List<LoanBizTypeEnum>
	 */
	public List<LoanBizTypeEnum> getAllEnum() {
		List<LoanBizTypeEnum> list = new ArrayList<LoanBizTypeEnum>();
		for (LoanBizTypeEnum _enum : values()) {
			list.add(_enum);
		}
		return list;
	}
	
	/**
	 * 获取全部枚举值
	 * 
	 * @return List<String>
	 */
	public List<String> getAllEnumCode() {
		List<String> list = new ArrayList<String>();
		for (LoanBizTypeEnum _enum : values()) {
			list.add(_enum.code());
		}
		return list;
	}
}
