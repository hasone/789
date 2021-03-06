package com.icebreak.p2p.integration.openapi.enums;

import java.util.ArrayList;
import java.util.List;

public enum OpenAPIErrorCodeEnum {
	
	REPEAT_OUT_BIZ_NO("REPEAT_OUT_BIZ_NO", "重复订单"),
	EXECUTE_FAILURE("EXECUTE_FAILURE", "同步调用失败");
	
	/** 枚举值 */
	private final String	code;
	
	/** 枚举描述 */
	private final String	message;
	
	/**
	 * 构造一个<code>OpenAPIErrorCodeEnum</code>枚举对象
	 *
	 * @param code
	 * @param message
	 */
	private OpenAPIErrorCodeEnum(String code, String message) {
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
	 * @return OpenAPIErrorCodeEnum
	 */
	public static OpenAPIErrorCodeEnum getByCode(String code) {
		for (OpenAPIErrorCodeEnum _enum : values()) {
			if (_enum.getCode().equals(code)) {
				return _enum;
			}
		}
		return null;
	}
	
	/**
	 * 获取全部枚举
	 * 
	 * @return List<OpenAPIErrorCodeEnum>
	 */
	public List<OpenAPIErrorCodeEnum> getAllEnum() {
		List<OpenAPIErrorCodeEnum> list = new ArrayList<OpenAPIErrorCodeEnum>();
		for (OpenAPIErrorCodeEnum _enum : values()) {
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
		for (OpenAPIErrorCodeEnum _enum : values()) {
			list.add(_enum.code());
		}
		return list;
	}
}
